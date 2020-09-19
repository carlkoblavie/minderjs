function initSearch() {
  return {
    query: "",
    loading: true,
    resultsHtml: null,
    search: async function () {
      if (!this.query) return;
      const response = await fetch(
        `http://0.0.0.0:3333/search/customer/${this.query}`
      );
      const { data } = await response.json();
      this.resultsHtml = data
        .map(({ first_name, last_name, id, phone_number }) => {
          return `<p><a href='/customers/${id}'>${first_name} ${last_name} | ${phone_number}</a></p>`;
        })
        .join(" ");
    },
  };
}
