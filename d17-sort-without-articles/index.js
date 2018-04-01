const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

// const articles = ['a ', 'an ', 'the '];
// const patterns = articles.map(article => new RegExp(article, 'i'));

// const trimArticles = word => patterns.reduce((w, pattern) => w = w.replace(pattern, ''), word);
const trimArticles = word => word.replace(/^(a |an |the )/i, '');

const sortedBands = bands.sort((a,b) => trimArticles(a) > trimArticles(b) ? 1 : -1);

const ul = document.querySelector('#bands');

ul.innerHTML = sortedBands.map(band => `<li>${band}</li>`).join('');