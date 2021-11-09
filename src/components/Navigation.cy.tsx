//@ts-nocheck
// import * as VueRouter from 'vue-router';
import store from '@/store';
// import { supabase } from '@/supabase/init';
import Navigation from './Navigation.vue';
import { mount } from '@cypress/vue';

describe('Navigation', () => {
  beforeEach(() => {});

  it('should have title', () => {
    mount(<Navigation />);
    cy.get('header').contains('Active Tracker').should('exist');
  });

  it('when user is logged in, Logout link should appear', () => {
    cy.stub(store.state, 'user').get(() => ({ name: 'testuser' }));
    mount((<Navigation />) as any);
    cy.contains('Logout').should('exist');
  });

  it('when user is logged in, Create link should appear', () => {
    cy.stub(store.state, 'user').get(() => ({ name: 'testuser' }));
    mount((<Navigation />) as any);
    cy.contains('Create').should('exist');
  });

  // Can't get useRouter to mock
  // it('when user is logged in, clicking logout should call signOut', () => {
  // cy.stub(VueRouter, 'useRouter').returns({ push: () => {} });
  //   cy.stub(store.state, 'user').get(() => ({ name: 'testuser' }));
  //   cy.stub(supabase.auth, 'signOut').as('signOut');
  //   mount((<Navigation />) as any);
  //   cy.contains('Logout').click();
  //   cy.get('@signOut').should('have.been.calledOnce');
  // });
});
