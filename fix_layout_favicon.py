import re

with open("src/layouts/BaseLayout.astro", "r") as f:
    content = f.read()

favicon_svg = '<link rel="icon" href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'><rect x=\'2\' y=\'2\' width=\'18\' height=\'18\' rx=\'6\' fill=\'%23FF5B2E\' /><rect x=\'12\' y=\'12\' width=\'18\' height=\'18\' rx=\'6\' fill=\'%230B0B0D\' fill-opacity=\'0.9\' /></svg>" />'

content = re.sub(r'<link rel="icon".*?/>', favicon_svg, content)

with open("src/layouts/BaseLayout.astro", "w") as f:
    f.write(content)
