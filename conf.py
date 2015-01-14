# -*- coding: utf-8 -*-
import sys, os
from sphinx.highlighting import lexers
from pygments.lexers.web import PhpLexer
from datetime import date

source_suffix = '.rst'
master_doc = 'index'
project = 'Unyson Framework'
copyright = `date.today().year` + ' Unyson | Theming Fast & Easy ' + \
    '<br>Developed by: <a target="_blank" href="http://themefuse.com">ThemeFuse</a>	Icons by: <a target="_blank" href="http://pixelkit.com">PixelKit</a>'
#version = ''
#release = ''
#exclude_patterns = []

html_favicon = 'favicon.ico'
html_theme_path = ["_themes"]
html_theme = 'themefuse'

man_pages = [
    ('index', 1)
]

lexers['php'] = PhpLexer(startinline=True)
lexers['php-annotations'] = PhpLexer(startinline=True)
primary_domain = 'php'
