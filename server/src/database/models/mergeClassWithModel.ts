/**
 * A function to merge a non-persistent type with sequelize.Model
 *
 * @param derivedClass  A class that extends sequelize.Model. This will be modified to include the properties defined in baseConstructor
 * @param baseClass  A class that does not extend sequlize.Model who's properties are to be included in baseConstructor
 */
export default (derivedClass: any, baseClass: any) => {
  Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
    const ownPropertyDescriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name);
    // Copy the properties of the baseClass to the baseClass. The exeption being that
    // we defer to sequelize.Model's 'constructor'. This should only be a problem if there is code in the baseClass's 'constructor'
    // function that does something besides initializing properties of the class. TypeScript will protect us against other conflicts.
    // For example if baseClass has a property named 'save' the compiler will throw the following error:
    // "Named property 'save' of types 'Model<any, any>' and 'BaseClass' are not identical.""
    if (derivedClass.prototype[name]) {
      
      if (name === 'constructor') {
        return;
      }
    }
    if(ownPropertyDescriptor) {
      Object.defineProperty(derivedClass.prototype, name, ownPropertyDescriptor);
    }
  });
}