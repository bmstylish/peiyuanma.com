---
source: bsides2026-ctf
title: guesstype CTF Write-up
description: A file upload challenge where I bypassed the extension and MIME
  type checks using a data URL as the filename
date: 2026-09-25
difficulty: beginner
tags:
  - web
  - python
  - mime
  - file-upload
status: complete
draft: false
---
This was a web challenge where we had to bypass a file upload check. We were also given a Python file showing how the backend worked. It looked fairly simple at first, but the custom MIME type, `skateboarding/dog`, was the part that got me stuck.

The uploaded filename had to end in `.dog`, and `mimetypes.guess_type()` had to return `skateboarding/dog`:

```python
if Path(filename).suffix != ".dog":
    return jsonify(error="i don't like that extension!"), 400

mime_type, _ = mimetypes.guess_type(filename)
if mime_type != "skateboarding/dog":
    return jsonify(error="i don't like that filetype!"), 400
```

My first attempt was to change the upload's `Content-Type` header to `skateboarding/dog`. I had been researching MIME bypasses, so that was the first thing I tried.

```http
Content-Type: skateboarding/dog
```

That didn't work. Looking back at the provided code, I realised it wasn't checking the header at all. It was using the filename:

```python
filename = user_file.filename
mime_type, _ = mimetypes.guess_type(filename)
```

So I started looking into how `mimetypes.guess_type()` actually worked. I initially thought it only checked file extensions, but after reading the source, I found that it also supports `data:` URLs. For those, it takes the MIME type from the part before the comma.

That gave me a way to supply the custom MIME type through the filename while still ending it with `.dog`. An example of the payload is:

```text
data:skateboarding/dog,test.dog
```

The two checks interpret that same filename differently. `Path(filename).suffix` sees `.dog`, while `mimetypes.guess_type()` recognises the `data:` URL and returns `skateboarding/dog`.

This small example shows why it passes:

```python
import mimetypes
from pathlib import Path

filename = "data:skateboarding/dog,test.dog"

print(Path(filename).suffix)
print(mimetypes.guess_type(filename))
```

Output:

```text
.dog
('skateboarding/dog', None)
```

For the upload, the payload goes in the multipart `filename` field:

```http
Content-Disposition: form-data; name="file"; filename="data:skateboarding/dog,test.dog"
```

The main thing I learnt from this challenge was to look more closely at the function being used. I spent time trying to change the HTTP header, but the check was based on the filename the whole time. Which made this challenge took way longer than it should've. Once I understood how `guess_type()` handled `data:` URLs, the custom MIME type made a lot more sense.
