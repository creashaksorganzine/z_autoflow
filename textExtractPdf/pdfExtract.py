import re
import PyPDF2
import spacy

# Load the English language model for spaCy
nlp = spacy.load('en_core_web_sm')

# Open the PDF file
pdf_file = open('The_Analyst_and_the_Small_Group.pdf', 'rb')

# Create a PDF reader object
pdf_reader = PyPDF2.PdfReader(pdf_file)

# Loop through each page and extract the text
text = ''
for page in range(len(pdf_reader.pages)):
    text += pdf_reader.pages[page].extract_text()

# Replace runs of whitespace characters with single spaces
text = re.sub(r'\s+', ' ', text)

# Tokenize the text using spaCy
doc = nlp(text)
tokenized_text = [token.text for token in doc]

# Join the tokenized words with spaces
text = ' '.join(tokenized_text)

# Close the PDF file
pdf_file.close()

# Open the HTML file for appending
with open('index.html', 'a') as f:
    # Append the extracted text to the HTML file
    f.write(f'<p>{text}</p>')


# import PyPDF2
# import re
# import spacy

# # Load the English language model for spaCy
# nlp = spacy.load('en_core_web_sm')

# # Open the PDF file
# pdf_file = open('The_Analyst_and_the_Small_Group.pdf', 'rb')

# # Create a PDF reader object
# pdf_reader = PyPDF2.PdfReader(pdf_file)

# # Loop through each page and extract the text
# text = ''
# for page in range(len(pdf_reader.pages)):
#     text += pdf_reader.pages[page].extract_text()

# # Replace runs of whitespace characters with single spaces
# text = re.sub(r'\s+', ' ', text)

# # Tokenize the text using spaCy
# doc = nlp(text)
# tokenized_text = [token.text for token in doc]

# # Join the tokenized words with spaces
# text = ' '.join(tokenized_text)

# # Close the PDF file
# pdf_file.close()

# # Open the HTML file for appending
# with open('index.html', 'a') as f:
#     # Append the extracted text to the HTML file
#     f.write(f'<p>{text}</p>')
