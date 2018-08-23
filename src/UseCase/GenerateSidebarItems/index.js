export default class GenerateSidebarItems {
  execute(schema, data) {
    let items = {};

    if (schema.type === "array") {
      items = this.generateItemsForArray(schema, data);
    } else {
      items = this.generateItemsForProperties(schema.properties, "#root");
    }

    return { items };
  }

  generateItemsForArray(schema, data) {
    let items = {};

    data.forEach((_, i) => {
      let children = this.generateItemsForProperties(
        schema.items.properties,
        `#root_${i}`
      );

      items[i] = {
        title: `${schema.items.title} ${i + 1}`,
        link: `#root_${i}__title`,
        children
      };
    });

    return items;
  }

  generateItemsForProperties(properties, link_root) {
    let items = {};
    Object.entries(properties).map(
      ([key, value]) =>
        (items[key] = { title: value.title, link: `${link_root}_${key}` })
    );

    return items;
  }
}
