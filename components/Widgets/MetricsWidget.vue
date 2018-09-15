<template>
    <div :class="$style.wrapper">
        <div :class="$style.title">Publishing More Android News then Anyone Else</div>
        <div :class="$style.metrics">
            <div :class="$style.row">
                <div :class="$style.col">
                    <div :class="$style.itemTitle">This Day</div>
                    <div :class="$style.itemNumber">{{ item.day.toLocaleString('en') }}</div>
                    <div :class="$style.itemSub">articles</div>
                </div>
                <div :class="$style.col">
                    <div :class="$style.itemTitle">This Week</div>
                    <div :class="$style.itemNumber">{{ item.week.toLocaleString('en') }}</div>
                    <div :class="$style.itemSub">articles</div>
                </div>
                <div :class="$style.col">
                    <div :class="$style.itemTitle">This Month</div>
                    <div :class="$style.itemNumber">{{ item.month.toLocaleString('en') }}</div>
                    <div :class="$style.itemSub">articles</div>
                </div>
            </div>
            <div :class="$style.row">
                <div :class="$style.col">
                    <div :class="$style.itemTitle">This Year</div>
                    <div :class="$style.itemNumber">{{ item.year.toLocaleString('en') }}</div>
                    <div :class="$style.itemSub">articles</div>
                </div>
                <div :class="$style.col">
                    <div :class="$style.itemTitle">All Time</div>
                    <div :class="$style.itemNumber">{{ item.all.toLocaleString('en') }}</div>
                    <div :class="$style.itemSub">articles</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0.5rem 0 1em;

        .title {
            background: $color-secondary;
            font-weight: 500;
            padding: 0.5rem;
        }

        .metrics {
            background: $font-color;
            color: $white;
            text-align: center;

            .row {
                display: flex;
                flex-direction: row;
                border-bottom: $black solid 1px;
                padding: 0.75rem 0.5rem;

                &:last-child {
                    border-bottom: none;
                }

                .col {
                    flex: 1;
                }
            }

            .itemTitle {
                text-transform: uppercase;
                opacity: 0.5;
                font-size: 0.875rem;
                padding: 0;
                font-weight: 100;
            }
            .itemNumber {
                font-size: 1.5rem;
            }
            .itemSub {
                font-size: 0.75rem;
                font-weight: 100;
            }
        }
    }
</style>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default() {
                    return {
                        day: 0,
                        week: 0,
                        month: 0,
                        year: 0,
                        all: 0
                    }
                }
            }
        }
    }
</script>