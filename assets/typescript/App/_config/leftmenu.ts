let routes:any[] = [
    {
        label: 'Calculatrice',
        name: 'calculate',
        icon: 'fa fa-calculator',
        exact: true,
    },
    {
        label: 'Objets',
        name: 'item-index',
        icon: 'fa fa-box',
        exact: true,
    },
    {
        label: 'Recettes',
        name: 'recipe-index',
        icon: 'fa fa-cubes',
        exact: true,
    },
    {
        label: 'Mods',
        name: 'mod-index',
        icon: 'fa fa-boxes',
        exact: true,
    },
    {
        label: 'Connexion',
        name: 'security-sign-in',
        icon: 'fa fa-sign-in-alt',
        exact: true,
        loggedIn: false
    },
    {
        label: 'Déconnexion',
        name: 'security-sign-out',
        icon: 'fa fa-sign-out-alt',
        exact: true,
        loggedIn: true
    },
];
export default routes;

