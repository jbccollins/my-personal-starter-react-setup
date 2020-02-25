/**
 * A function to merge a non-persistent type with sequelize.Model
 *
 * @param derivedConstructor  A class that extends sequelize.Model. This will be modified to include the properties defined in baseConstructor
 * @param classConstructor  A class that does not extend sequlize.Model who's properties are to be included in baseConstructor
 */
export default (derivedConstructor: any, baseConstructor: any) => {
  Object.getOwnPropertyNames(baseConstructor.prototype).forEach(name => {
    const ownPropertyDescriptor = Object.getOwnPropertyDescriptor(baseConstructor.prototype, name);
    // Copy the properties of the baseConstructor to the derivedConstructor. The exeption being that
    // we defer to sequelize.Model's 'constructor'. This should only be a problem if there is code in the baseConstructor's 'constructor'
    // function that does something besides initializing properties of the class. TypeScript will protect us against other conflicts.
    // For example if baseConstructor has a property named 'save' the compiler will throw the following error:
    // "Named property 'save' of types 'Model<any, any>' and 'BaseConstructorClass' are not identical.""
    if (derivedConstructor.prototype[name]) {
      if (name === 'constructor') {
        return;
      }
    }
    if(ownPropertyDescriptor) {
      Object.defineProperty(derivedConstructor.prototype, name, ownPropertyDescriptor);
    }
  });
}