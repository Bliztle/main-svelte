import { afterEach, beforeEach, describe, expect, it } from "vitest";

import BottomDrawer from "./BottomDrawer.svelte";
import { cleanup, fireEvent, render, type RenderResult } from "@testing-library/svelte";
import CssImport from "../../../routes/CssImport.svelte";

describe('BottomDrawer.svelte', () => {

    afterEach(() => cleanup());

    const text = 'BottomDrawer.svelte test text';
    let rendered: RenderResult<BottomDrawer>;

    beforeEach(() => {
        const container = document.createElement('div');
        // container.classList.add("w-screen", "h-screen");
        // container.classList.add("w-80", "h-80");
        container.style.height = '500px';
        container.style.width = '500px';
        document.body.replaceChildren(container);
        render(CssImport);
        rendered = render(BottomDrawer, { props: { text } }, { container });
    });

    it('mounts', () => {
        expect(rendered.container).toBeTruthy();
        expect(rendered.container.innerHTML).toContain(text);
    });

    beforeEach(() => {
        const div = document.createElement('div');
        div.style.height = '300px';
        rendered.getByTestId('slot').appendChild(div);
    });

    it('opens and closes on click', async () => {
        const btn = rendered.getByRole('button');
        expect(rendered.container.offsetHeight).toBeLessThan(300);
        await fireEvent.click(btn);
        expect(rendered.container.offsetHeight).toBeGreaterThan(300);
    });
});