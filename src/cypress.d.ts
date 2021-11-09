declare namespace Cypress {
  interface Chainable {
    /**
     * Helper mount function for Vue Components
     * @param component
     * @param options
     */
    mount(component: any, options?: any): Chainable<Element>;

    /**
     * Helper mount function for Vue Components
     * @param component
     * @param options
     */
    useComponent(name: string, component: any);
  }
}
