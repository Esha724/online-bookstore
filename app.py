from flask import Flask, jsonify, request

app = Flask(__name__)

books = [
    {
        'id': 1,
        'title': 'Book 1',
        'author': 'Author 1',
        'description': 'Description 1',
        'cover_image': 'book1.jpg',
        'price': 9.99,
        'rating': 4.5,
        'genre': 'Fiction',
        'publication_date': '2022-01-01'
    },
    {
        'id': 2,
        'title': 'Book 2',
        'author': 'Author 2',
        'description': 'Description 2',
        'cover_image': 'book2.jpg',
        'price': 14.99,
        'rating': 3.8,
        'genre': 'Non-Fiction',
        'publication_date': '2021-09-15'
    },
    {
        'id': 3,
        'title': 'Book 3',
        'author': 'Author 3',
        'description': 'Description 3',
        'cover_image': 'book3.jpg',
        'price': 11.99,
        'rating': 4.2,
        'genre': 'Mystery',
        'publication_date': '2023-03-10'
    }
]

@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/books/search', methods=['GET'])
def search_books():
    query = request.args.get('query')

    results = []
    for book in books:
        if query.lower() in book['title'].lower() or query.lower() in book['author'].lower() or query.lower() in book['genre'].lower():
            results.append(book)

    return jsonify(results)

@app.route('/books/filter', methods=['GET'])
def filter_books():
    genre = request.args.get('genre')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    publication_date = request.args.get('publication_date')

    results = []
    for book in books:
        if genre and genre.lower() not in book['genre'].lower():
            continue
        if min_price and book['price'] < float(min_price):
            continue
        if max_price and book['price'] > float(max_price):
            continue
        if publication_date and book['publication_date'] != publication_date:
            continue

        results.append(book)

    return jsonify(results)

if __name__ == '__main__':
    app.run()
