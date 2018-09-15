<template>
    <div :class="$style.wrapper">
        <div :class="$style.title">Colors</div>
        <div :class="$style.row">
            <color-block title="Primary" hex="#E71E25" rgb="rgba(231, 30, 37, 1)" variable="$color-primary" />
            <color-block title="Secondary" hex="#EFEFEF" rgb="rgba(119, 119, 119, 1)" variable="$color-secondary" />
            <color-block title="Base Font Color" hex="#333333" rgb="rgba(51, 51, 51, 1)" variable="$font-color" />
            <color-block title="Black" hex="#000000" rgb="rgba(0, 0, 0, 1)" variable="$color-black" />
            <color-block title="White" hex="#FFFFFF" rgb="rgba(255, 255, 255, 1)" variable="$color-white" />
        </div>
        <div :class="$style.title">Brand Colors</div>
        <div :class="$style.row">
            <color-block title="Android" hex="#76C14E" min />
            <color-block title="Amazon" hex="#FF9900" min />
            <color-block title="ASUS" hex="#33B9FF" min />
            <color-block title="Blackberry" hex="#005387" min />
            <color-block title="Google" hex="#4285F4" min />
            <color-block title="HTC" hex="#A5CF4C" min />
            <color-block title="Huawei" hex="#B60005" min />
        </div>
        <div :class="$style.row">
            <color-block title="Lenovo" hex="#3177D8" min />
            <color-block title="LG" hex="#990033" min />
            <color-block title="Motorola" hex="#5C92FA" min />
            <color-block title="Nokia" hex="#124191" min />
            <color-block title="OnePlus" hex="#EB0029" min />
            <color-block title="Samsung" hex="#1428A0" min />
            <color-block title="Sony" hex="#00A4E8" min />
        </div>
        <div :class="$style.row">
            <color-block title="Verizon" hex="#ED1B34" min />
            <color-block title="Xiaomi" hex="#FF6600" min />
        </div>
        <div :class="$style.title">Category Colors</div>
        <div :class="$style.row">
            <color-block title="Android News" hex="#529230" min />
            <color-block title="Apps" hex="#673AB7" min />
            <color-block title="Best Cell Phone Deals" hex="#3F51B5" min />
            <color-block title="Carriers" hex="#2196F3" min />
            <color-block title="Chinese Smartphones" hex="#03A9F4" min />
            <color-block title="Gift Guide" hex="#00BCD4" min />
            <color-block title="Giveaways" hex="#009688" min />
        </div>
        <div :class="$style.row">
            <color-block title="Mobile Events" hex="#5095B7" min />
            <color-block title="Phone Comparisons" hex="#8BC34A" min />
            <color-block title="Reviews" hex="#9AA43A" min />
            <color-block title="Smartwatches" hex="#E7B82D" min />
            <color-block title="Tech News" hex="#FF9702" min />
            <color-block title="Various Smartphones" hex="#FF5622" min />
            <color-block title="Wearables" hex="#785548" min />
        </div>
        <div :class="$style.row">
            <color-block title="Special Features" hex="#999999" min />
            <color-block title="News Tips" hex="#607D8B" min />
        </div>
        <div :class="$style.title">Typography</div>
        <div :class="$style.row">
            <typo-block font="Work Sans" source="Google Fonts" types="Bold, Medium" variable="$base-font-family" />
            <typo-block font="Roboto" source="Google Fonts" types="Regular, Light" variable="$second-font-family" />
        </div>
        <h1>Header One (H1)</h1>
        <h2>Header Two (H2)</h2>
        <h3>Header Three (H3)</h3>
        <h4>Header Four (H4)</h4>
        <h5>Header Five (H5)</h5>
        <h6>Header Six (H6)</h6>
        <div><span :class="$style.legal">Legal</span></div>
        <div :class="$style.title">Lead Paragraph</div>
        <p class="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut mollis nibh. Morbi ac ultricies libero. Suspendisse eget lacus eu est volutpat varius. Fusce tempus odio porta, finibus dolor ut, efficitur ligula. Vestibulum suscipit arcu vitae dolor aliquam pretium.
        </p>
        <div :class="$style.title">Paragraph</div>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut mollis nibh. Morbi ac ultricies libero. Suspendisse eget lacus eu est volutpat varius. Fusce tempus odio porta, finibus dolor ut, efficitur ligula. Vestibulum suscipit arcu vitae dolor aliquam pretium.
        </p>
        <div :class="$style.title">Small Paragraph</div>
        <p class="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut mollis nibh. Morbi ac ultricies libero. Suspendisse eget lacus eu est volutpat varius. Fusce tempus odio porta, finibus dolor ut, efficitur ligula. Vestibulum suscipit arcu vitae dolor aliquam pretium.
        </p>
        <div :class="$style.title">Blockquote</div>
        <blockquote>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut mollis nibh. Morbi ac ultricies libero. Suspendisse eget lacus eu est volutpat varius. Fusce tempus odio porta, finibus dolor ut, efficitur ligula. Vestibulum suscipit arcu vitae dolor aliquam pretium.
        </blockquote>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        padding: 1.5rem;
        font-family: "Helvetica Neue";

        .title {
            font-weight: bold;
            font-size: 1.5rem;
        }

        .row {
            display: flex;
            flex-direction: row;
            box-sizing: border-box;
        }

        .legal {
            font-family: $base-font-family;
            font-size: 10px;
            font-weight: 500;
            color: #333333;
        }
    }
</style>

<script>
    import ColorBlock from '~/components/StyleGuide/Blocks/ColorBlock'
    import TypoBlock from '~/components/StyleGuide/Blocks/TypoBlock'

    export default {
        layout: 'styleguide',
        components: {
            ColorBlock,
            TypoBlock
        }
    }
</script>