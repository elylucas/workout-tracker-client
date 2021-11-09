describe('RegisterPage', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  afterEach(() => {
    // const token = JSON.parse(localStorage.getItem('supabase.auth.token'));
    // const jwt = token.currentSession.access_token;
    // console.log(jwt);
    cy.task('deleteUser', 'test@test.com');
  });

  it('should register new user', () => {
    cy.get('#email').type('test@test.com');
    cy.get('#password').type('aabbcc');
    cy.get('#confirmPassword').type('aabbcc');
    cy.get('button').contains('Register').click();
  });
});
