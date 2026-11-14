const titles = [
  {
    title: "AI Engineering",
    subtitle: "Building Applications with Foundation Models",
    author: "Chip Huyen",
    isbn: "9781098166298",
    slug: "ai-engineering",
    binding: "moss",
    note: "How do you tell whether an AI application is working well? Huyen follows that question from model selection and evaluation to retrieval, fine-tuning, and deployment."
  },
  {
    title: "Designing Data-Intensive Applications",
    subtitle: "The Big Ideas Behind Reliable, Scalable, and Maintainable Systems · Second edition",
    author: "Martin Kleppmann and Chris Riccomini",
    isbn: "9781098119058",
    slug: "designing-data-intensive",
    binding: "indigo",
    note: "What happens to a write when data lives on several machines? The authors use questions like this to explore the trade-offs behind storage engines, replication, and distributed transactions."
  },
  {
    title: "Designing Machine Learning Systems",
    subtitle: "An Iterative Process for Production-Ready Applications",
    author: "Chip Huyen",
    isbn: "9781098107956",
    slug: "designing-machine-learning",
    binding: "clay",
    note: "Training a model is one step in a longer process. This book traces the work around it, from collecting useful data to detecting changes after deployment and deciding when to retrain."
  }
];

export const intendedShelf = {
  id: "intended-to-read",
  name: "Intended to Read",
  books: titles.map(({ isbn, slug, note, ...book }) => ({
    ...book,
    coverImage: `https://learning.oreilly.com/library/cover/${isbn}/250w/`,
    url: `https://www.oreilly.com/library/view/${slug}/${isbn}/`,
    chapters: [["About the book", note]]
  }))
};
