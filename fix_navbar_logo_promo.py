import re

with open("src/components/Header/Navbar.tsx", "r") as f:
    content = f.read()

# 1. Remove PromoStripe import and usage
content = re.sub(r"import PromoStripe from '\./PromoStripe';\n", "", content)
content = re.sub(r"<div className=\{`fixed top-0 inset-x-0 z-\[101\] transition-transform duration-300 \$\{scrolled \? '-translate-y-full' : 'translate-y-0'\}`\}>\n\s*<PromoStripe />\n\s*</div>", "", content)

# 2. Fix header top position
content = content.replace("top-[36px]", "top-0")

# 3. Replace Logo
logo_svg = """<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
            <rect x="2" y="2" width="18" height="18" rx="6" fill="#FF5B2E" />
            <rect x="12" y="12" width="18" height="18" rx="6" fill="#FFFFFF" fillOpacity="0.9" />
          </svg>"""
          
content = re.sub(r'<img src="/assets/images/modelscale-logo\.png".*?/>', logo_svg, content)

with open("src/components/Header/Navbar.tsx", "w") as f:
    f.write(content)
