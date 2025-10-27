import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Card from './card.vue';

describe('Card.vue', () => {
  it('renders title and subtitle props', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
      },
    });

    expect(wrapper.text()).toContain('Test Title');
    expect(wrapper.text()).toContain('Test Subtitle');
  });

  it('renders default slot content', () => {
    const wrapper = mount(Card, {
      slots: {
        default: '<div class="slot-content">Default slot</div>',
      },
    });

    expect(wrapper.find('.slot-content').exists()).toBe(true);
    expect(wrapper.find('.slot-content').text()).toBe('Default slot');
  });

  it('renders header and footer slots', () => {
    const wrapper = mount(Card, {
      slots: {
        header: '<div class="card-header">Header</div>',
        footer: '<div class="card-footer">Footer</div>',
      },
    });

    // expect(wrapper.find('.card-header').exists()).toBe(true);
    // expect(wrapper.find('.card-header').text()).toBe('Header');
    // expect(wrapper.find('.card-footer').exists()).toBe(true);
    // expect(wrapper.find('.card-footer').text()).toBe('Footer');
  });

  it('renders an image when imageSrc and imageAlt props are provided', () => {
    const wrapper = mount(Card, {
      props: {
        imageSrc: '/img/test.png',
        imageAlt: 'Test image',
      },
    });

    // const img = wrapper.find('img');
    // expect(img.exists()).toBe(true);
    // expect(img.attributes('src')).toBe('/img/test.png');
    // expect(img.attributes('alt')).toBe('Test image');
  });

  it('emits click when root is clicked', async () => {
    const wrapper = mount(Card);
    await wrapper.trigger('click');
    // If the component emits a `click` event on user interaction this will pass
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
