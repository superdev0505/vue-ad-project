import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '~/pages/HomePage'
import Category from '~/pages/Categories/Category'
import AMPArticle from '~/pages/Articles/AMPArticle'
import StandardArticle from '~/pages/Articles/StandardArticle'
import StandardPage from '~/pages/Pages/StandardPage'
import SearchPage from '~/pages/SearchPage'
import AuthorsList from '~/pages/Authors/AuthorsList'
import AuthorsPage from '~/pages/Authors/AuthorsPage'

import Deals from '~/pages/Deals/Deals'
import SponsoredDeals from '~/pages/Deals/SponsoredDeals'
import GiftGuides from '~/pages/Deals/GiftGuides'

Vue.use(Router)

export function createRouter(options) {
    const routes = [
        {
            name: 'home',
            path: '/',
            component: HomePage
        },
        {
            name: 'authors',
            path: '/site-authors',
            component: AuthorsList
        },
        {
            name: 'author',
            path: '/author/:slug',
            component: AuthorsPage
        },
        {
            name: 'search',
            path: '/search',
            component: SearchPage
        },
        {
            name: 'deals',
            path: '/category/best-cell-phone-deals',
            component: Deals
        },
        {
            name: 'homepage-featured',
            path: '/category/best-cell-phone-deals/homepage-featured',
            component: SponsoredDeals
        },
        {
            name: 'gift-guide',
            path: '/category/best-cell-phone-deals/gift-guide',
            component: GiftGuides
        },
        {
            name: 'category',
            path: '/category/:permalink*',
            component: Category
        },
        {
            name: 'event',
            path: '/event/:permalink*',
            component: Category
        },
        {
            name: 'product',
            path: '/product/:permalink*',
            component: Category
        },
        {
            name: 'amp-post',
            path: '/amp/:permalink([0-9]+[/|%2f|%2F][0-9]+[/|%2f|%2F][\\S]+)',
            component: AMPArticle
        },
        {
            name: 'post',
            path: '/:permalink([0-9]+[/|%2f|%2F][0-9]+[/|%2f|%2F][\\S]+)',
            component: StandardArticle
        },
        {
            name: 'page',
            path: '/:permalink',
            component: StandardPage
        }
    ]
    return new Router({
        mode: 'history',
        scrollBehavior (to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        },
        routes: routes
    })
}