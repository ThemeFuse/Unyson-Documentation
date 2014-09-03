# -*- coding: utf-8 -*-
import sys, os
from sphinx.highlighting import lexers
from pygments.lexers.web import PhpLexer
from datetime import date

source_suffix = '.rst'
master_doc = 'index'
project = 'Unyson'
copyright = `date.today().year` + ' ThemeFuse | Premium WordPress Themes and WordPress Templates' + \
    '<br>Icons and GUI elements from our sister-site: <a href="http://pixelkit.com">PixelKit.com</a>'
#version = ''
#release = ''
#exclude_patterns = []

html_theme_path = ["_themes"]
html_theme = 'themefuse'
html_favicon = 'favicon.ico'

man_pages = [
    ('index', 1)
]

lexers['php'] = PhpLexer(startinline=True)
lexers['php-annotations'] = PhpLexer(startinline=True)
primary_domain = 'php'
