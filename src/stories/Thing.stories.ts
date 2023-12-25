import Button from '../Thing.svelte';

export default {
    title: 'Thing',
    component: Button,
};

export const Primary = () => ({
    Component: Button,
    props: {
        text: 'Thing Primary Button',
    },
});
