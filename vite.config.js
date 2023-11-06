import { defineConfig } from "vite";
export default defineConfig({
    plugins: [],
    resolve: {
        alias: [
                                                     /* branch: alt-develop (is subject to change!) */
            {find: '@declarative-hud', replacement: '/../../declarative-hud/src/views'}
        ]
    }
})