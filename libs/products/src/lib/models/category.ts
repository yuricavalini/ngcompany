export class Category {
  id: string;
  name: string;
  icon: string;
  color: string;

  constructor({ id, name, icon, color }: Category) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.color = color;
  }
}
