import '../../src/assets/tailwind.css';
import { h } from 'vue';
import { mount } from '@cypress/vue';
import Button from '../../src/components/Button.vue';

Cypress.Commands.add('mount', (comp, options = {}) => {
  const globalComponents: Record<string, any> = {
    Button: Button,
  };
  options.global = options.global || {};
  options.global.stubs = options.global.stubs || {};
  options.global.stubs.transition = false;
  options.global.components = options.global.components || {};
  options.global.components['router-link'] = (props, context) => {
    return h(
      `a`,
      {
        href:
          typeof props.to === 'string' ? props.to : JSON.stringify(props.to),
      },
      context.slots.default()
    );
  };
  const componentKeys = Object.keys(globalComponents);
  componentKeys.forEach(
    (key) => (options.global.components[key] = globalComponents[key])
  );

  return mount(comp, options);
});
