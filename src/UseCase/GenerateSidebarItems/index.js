export default class GenerateSidebarItems {
  execute(schema, data) {
    let items = {};

    if (schema.type === "array") {
      items = this.generateItemsForArray(schema, data);
    } else {
      items = this.generateItemsForProperties(schema.properties);
    }

    return { items };
  }

  generateItemsForArray(schema, data) {
    let items = {};

    data.forEach((_, i) => {
      items[i] = {
        title: `${schema.items.title} ${i + 1}`,
        children: this.genreateItemsForChildren(schema, i)
      };
    });

    return items;
  }

  genreateItemsForChildren(schema, index) {
    let children = {};

    Object.entries(schema.items.properties).map(
      ([key, value]) =>
        (children[key] = { title: value.title, subSection: key, index })
    );

    return children;
  }

  generateItemsForProperties(properties) {
    let items = {};
    Object.entries(properties).map(([key, value]) => {
      if (value.type === "object" || value.type === "array") {
        items[key] = { title: value.title, subSection: key };
      }
      return null
    });

    return items;
  }
}
