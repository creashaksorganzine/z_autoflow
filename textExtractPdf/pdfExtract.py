from textblob import TextBlob
import PyPDF2
import re
import os


def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ''.join(page.extract_text() for page in pdf_reader.pages)
        return re.sub(r'\s+', ' ', text)


def correct_spelling_errors(text):
    blob = TextBlob(text)
    return str(blob.correct())


def append_text_to_html_file(html_path, corrected_text):
    with open(html_path, 'a', encoding='utf-8') as f:
        f.write(f'<div><p>{corrected_text}</p></div>')


def main():
    pdf_path = 'Soviet-Deception-Cuban-Missile.pdf'
    html_path = 'index.html'

    text = extract_text_from_pdf(pdf_path)
    corrected_text = correct_spelling_errors(text)
    append_text_to_html_file(html_path, corrected_text)


if __name__ == '__main__':
    main()
