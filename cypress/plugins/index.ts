/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { config } from 'dotenv';
config();
import { supabase, serviceRoleKey } from './supabase';

module.exports = (on) => {
  on('task', {
    async deleteUser(email: string) {
      await deleteUser(email);
      return null;
    },
  });
};

async function deleteUser(email: string) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error) throw error;
    console.info(`got user id ${user.id}, email ${user.email}, deleting user`);
    const { error: deleteUserError } = await supabase
      .from('users')
      .delete()
      .eq('id', user.id);
    if (deleteUserError) throw deleteUserError;
    console.info(`user deleted, deleting auth for user id ${user.id}`);
    const { error: deleteAuthError } = await supabase.auth.api.deleteUser(
      user.id,
      serviceRoleKey
    );
    if (deleteAuthError) throw deleteAuthError;
    console.info('Deleted User:', user);
  } catch (e: any) {
    if (e.message === 'JSON object requested, multiple (or no) rows returned') {
      console.info(`No data for email ${email} yet, trying again....`);
      setTimeout(() => deleteUser(email), 1000);
    } else {
      console.error(e);
    }
  }
}
