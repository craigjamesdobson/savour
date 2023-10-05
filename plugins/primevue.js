import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";
import InputNumber from "primevue/inputnumber";
import ToastService from 'primevue/toastservice';

import Button from "primevue/button";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true, unstyled: false, pt: Tailwind });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("InputNumber", InputNumber);
    nuxtApp.vueApp.use(ToastService);
});
