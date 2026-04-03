import { describe, it, expect, vi, beforeEach } from 'vitest';

// Import the plugin — it attaches to the global L set up in setup.js
import '../src/leaflet.resizer.js';

function createMockMap(width = 800, height = 600) {
    const mapContainer = { style: { width: '', height: '' } };
    return {
        getSize: () => ({ x: width, y: height }),
        getContainer: () => mapContainer,
        invalidateSize: vi.fn(),
    };
}

// ── Registration ──────────────────────────────────────────────────────────────

describe('registration', () => {
    it('exposes L.resizer factory', () => {
        expect(typeof L.resizer).toBe('function');
    });

    it('registers L.Control.Resizer', () => {
        expect(L.Control.Resizer).toBeDefined();
    });

    it('L.resizer() returns a L.Control.Resizer instance', () => {
        expect(L.resizer() instanceof L.Control.Resizer).toBe(true);
    });

    it('defaults to position topleft', () => {
        expect(L.resizer().options.position).toBe('topleft');
    });
});

// ── DOM structure ─────────────────────────────────────────────────────────────

describe('onAdd — DOM structure', () => {
    let container;

    beforeEach(() => {
        container = L.resizer().onAdd(createMockMap());
    });

    it('returns a div with lr-ctl class', () => {
        expect(container.tagName).toBe('DIV');
        expect(container.classList.contains('lr-ctl')).toBe(true);
    });

    it('contains the expand icon', () => {
        expect(container.querySelector('.lr-icon')).not.toBeNull();
    });

    it('contains exactly two inputs', () => {
        expect(container.querySelectorAll('.lr-input')).toHaveLength(2);
    });

    it('input names are lr-width and lr-height', () => {
        const inputs = container.querySelectorAll('.lr-input');
        expect(inputs[0].name).toBe('lr-width');
        expect(inputs[1].name).toBe('lr-height');
    });

    it('labels read Width and Height', () => {
        const labels = container.querySelectorAll('.lr-label');
        expect(labels[0].textContent).toBe('Width');
        expect(labels[1].textContent).toBe('Height');
    });

    it('contains a Resize button', () => {
        const btn = container.querySelector('.lr-btn');
        expect(btn).not.toBeNull();
        expect(btn.textContent).toBe('Resize');
    });
});

// ── Hover behaviour ───────────────────────────────────────────────────────────

describe('mouseenter — input population', () => {
    it('fills inputs with current map size on hover', () => {
        const map = createMockMap(1024, 768);
        const container = L.resizer().onAdd(map);
        const [w, h] = container.querySelectorAll('.lr-input');

        container.dispatchEvent(new Event('mouseenter'));

        expect(w.value).toBe('1024');
        expect(h.value).toBe('768');
    });

    it('refreshes values on each hover (picks up map resizes)', () => {
        let size = { x: 800, y: 600 };
        const map = {
            getSize: () => size,
            getContainer: () => ({ style: {} }),
            invalidateSize: vi.fn(),
        };
        const container = L.resizer().onAdd(map);
        const [w] = container.querySelectorAll('.lr-input');

        container.dispatchEvent(new Event('mouseenter'));
        expect(w.value).toBe('800');

        size = { x: 1280, y: 900 };
        container.dispatchEvent(new Event('mouseenter'));
        expect(w.value).toBe('1280');
    });
});

// ── Resize button ─────────────────────────────────────────────────────────────

describe('Resize button', () => {
    it('applies input values as px dimensions to the map container', () => {
        const map = createMockMap();
        const container = L.resizer().onAdd(map);
        const [w, h] = container.querySelectorAll('.lr-input');

        w.value = '1280';
        h.value = '720';
        container.querySelector('.lr-btn').click();

        expect(map.getContainer().style.width).toBe('1280px');
        expect(map.getContainer().style.height).toBe('720px');
    });

    it('calls map.invalidateSize() after applying dimensions', () => {
        const map = createMockMap();
        const container = L.resizer().onAdd(map);
        const [w, h] = container.querySelectorAll('.lr-input');

        w.value = '500';
        h.value = '400';
        container.querySelector('.lr-btn').click();

        expect(map.invalidateSize).toHaveBeenCalledOnce();
    });

    it('truncates decimal input values', () => {
        const map = createMockMap();
        const container = L.resizer().onAdd(map);
        const [w, h] = container.querySelectorAll('.lr-input');

        w.value = '800.9';
        h.value = '600.1';
        container.querySelector('.lr-btn').click();

        expect(map.getContainer().style.width).toBe('800px');
        expect(map.getContainer().style.height).toBe('600px');
    });
});
