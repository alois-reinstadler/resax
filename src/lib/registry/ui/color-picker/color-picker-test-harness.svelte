<script lang="ts">import ColorPicker from './color-picker.svelte';let value=$state('#ff0000');</script><ColorPicker bind:value/><output aria-label="bound color">{value}</output>
