import re

with open("src/components/Footer/Footer.astro", "r") as f:
    content = f.read()

logo_svg = """<svg width="42" height="42" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <rect x="2" y="2" width="18" height="18" rx="6" fill="#FF5B2E" />
              <rect x="12" y="12" width="18" height="18" rx="6" fill="#FFFFFF" fillOpacity="0.9" />
            </svg>"""

content = re.sub(r'<img src="/assets/images/modelscale-logo\.png".*?/>', logo_svg, content)

with open("src/components/Footer/Footer.astro", "w") as f:
    f.write(content)
