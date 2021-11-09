import { mount } from '@cypress/vue';
import Button from './Button.vue';

it('shows the header', () => {
  mount((<Button>Click Me</Button>) as any);
  cy.contains('Click Me').should('exist');
});
