---
source: bsides2026-ctf
title: gallery CTF Write-up
description: A gallery challenge where I used SQL injection and path traversal
  to read the server’s environment
date: 2026-09-25
difficulty: beginner
tags:
  - web
  - sqli
  - path-traversal
  - linux
status: complete
draft: false
---

This challenge was a gallery app, and we were given the source code. The main idea was to use SQL injection to control which file the server read, then get its contents from the page.

The hardest part for me was discovering `/proc/self/environ`. This was my first time coming across symlinks, and I got help from other people to understand how they worked and why that path was useful.

## Finding the SQL Injection

Looking through `index.js`, the query used the `id` from the URL directly:

```javascript
app.get('/:id', async (req, res) => {
    const id = req.params.id;
```

```javascript
const stmt = db.prepare(`SELECT * FROM gallery_pieces WHERE id = ${id}`);
```

Since the input was inserted into the query without parameterisation, we could change the SQL through the `id` parameter.

The provided schema also showed that the table had seven columns:

```sql
CREATE TABLE gallery_pieces (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT,
    medium TEXT,
    exhibition_period TEXT,
    description TEXT NOT NULL,
    filename TEXT NOT NULL
);
```

That gave us the column count and order for a `UNION SELECT`. The important one was `filename`, which was the seventh column.

## Controlling the File Read

The server used the filename from the database to read an image:

```javascript
const image = await fs.readFile(
    path.join(__dirname, 'images', row.filename)
);
```

It then encoded the contents as base64 and passed them to the template:

```javascript
data: image.toString('base64')
```

This meant the SQL injection could do more than return database values. By supplying our own row through a `UNION SELECT`, we could control `filename` and make the server read a different file.

The filename still needed to point to something readable, otherwise the file read would fail before the page rendered.

## Discovering `/proc/self/environ`

This was where I needed help. I didn't know about `/proc/self/environ`, so I wouldn't have known to try it on my own.

Other people helped me understand that `/proc/self` is a symlink pointing to the process accessing it. A symlink is basically a reference to another filesystem location. When the server accesses `/proc/self/environ`, it reads its own process environment.

That matters because a flag stored in the server's environment can appear there.

We could reach that path using `../` in the filename. `path.join()` normalises the path, but it doesn't keep it inside the `images` directory.

The injected `id` value was:

```sql
0 UNION SELECT 1,2,3,4,5,6,'../../../../../../proc/self/environ'
```

The `0` avoids selecting a normal gallery entry, assuming there isn't an entry with that ID. The seven values match the table's columns, with the traversal path in the `filename` position.

## Reading the Output

The server returned the file contents as base64 image data. It wasn't an actual image, so the useful part was the encoded data in the HTML rather than what the browser displayed.

After copying the base64 portion of the image's data URL, it could be decoded with any online decoder or tools of your liking.

The environment entries are separated by null bytes, so replacing them with newlines makes the output easier to read and find the flag.

The biggest thing I learnt here was how `/proc/self/environ` works. I had been focused on the SQL injection, but getting help with symlinks showed me how controlling a filename could expose information outside the database.
