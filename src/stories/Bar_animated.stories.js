import Bar_animated from '../Bar_animated.svelte';

export default {
    title: 'Bar_animated',
    component: Bar_animated,
};

export const R = () => ({
    Component: Bar_animated,
    props: {
        align: 'R',
    },
});

export const L = () => ({
    Component: Bar_animated,
    props: {
        align: 'L',
    },
});
