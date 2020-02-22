// https://alligator.io/typescript/mixins/
// https://codeburst.io/multiple-inheritance-with-typescript-mixins-d92d01198907
export default (derivedConstructor: any, baseConstructors: any[]) => {
  baseConstructors.forEach(baseConstructor => {
    Object.getOwnPropertyNames(baseConstructor.prototype).forEach(name => {
      const ownPropertyDescriptor = Object.getOwnPropertyDescriptor(baseConstructor.prototype, name);
      // Preserve the properties of the derivedConstructor if there are namespace conflicts
      if (derivedConstructor.prototype[name]) {
        console.log(">>>>>>>>>>>>>>>>")
        console.log('Conflict on ' + name)
        return;
      }
      if(ownPropertyDescriptor) {
        Object.defineProperty(derivedConstructor.prototype, name, ownPropertyDescriptor);
      }
    });
  });
}