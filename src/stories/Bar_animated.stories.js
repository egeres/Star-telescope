import Bar_animated from '../Bar_animated.svelte';

export default {
    title: 'Bar_animated',
    component: Bar_animated,
};

export const Primary = () => ({
    Component: Bar_animated,
    props: {
        align: 'R',
    },
});
