import RegisterForm from './RegisterForm.vue';

describe('Register', () => {
  it('should have Register as header', () => {
    cy.mount(<RegisterForm onRegister={() => {}} />);
    cy.get('h1').contains('Register').should('exist');
  });

  it('should show field are required errors clicking Register', () => {
    cy.mount(<RegisterForm onRegister={() => {}} />);
    cy.get('button').contains('Register').click();
    cy.get('p').contains('Email is required.').should('exist');
    cy.get('p').contains('Password is required.').should('exist');
    cy.get('p').contains('Confirm Password is required.').should('exist');
  });

  it('should show passwords do not match error', () => {
    cy.mount((<RegisterForm onRegister={() => {}} />) as any);
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('aaaaaa');
    cy.get('#confirmPassword').type('bbb');
    cy.get('button').contains('Register').click();
    cy.get('p').contains('Passwords do not match.').should('exist');
  });

  it('should call onRegister when form is valid', () => {
    const onRegisterSpy = cy.spy().as('onRegister');
    cy.mount(<RegisterForm onRegister={onRegisterSpy} />);
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('aaaaaa');
    cy.get('#confirmPassword').type('aaaaaa');
    cy.get('button').contains('Register').click();
    cy.get('@onRegister')
      .should('have.been.calledOnce')
      .should('have.been.calledWith', 'test@test.com', 'aaaaaa');
  });
});
