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
        title: this.generateTitle(schema.items.title, i),
        children: this.genreateItemsForChildren(schema, i)
      };
    });

    return items;
  }

  generateTitle(title, index) {
    if(title) {
      return `${title} ${index + 1}`
    } else {
      return ""
    }
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
