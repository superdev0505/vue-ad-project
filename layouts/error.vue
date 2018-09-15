<template>
  <div class="error-container">

  	<div v-if="error.statusCode === 404">
	    <h1>404 - Page not found</h1>
	    <p>Whoops! Sorry, but this page doesn't exist.</p>
    </div>

    <h1 v-else>An error occurred</h1>
    <p>{{ error }}</p>
    <a href="/"><span class="icon-link-arrow-left"></span> Back to Homepage</a>
  </div>
</template>

<style>

	.error-container {
		padding: 8em 0;
	    margin: auto;
	    max-width: 1280px;
	    min-height: 30em;
	    text-align: center;
	}

    .error-container a {
        margin-top: 0;
        text-transform: uppercase;
        font-weight: 700;
        font-size: .875em;
    }

    .error-container a:hover, 
    .error-container a:active, 
    .error-container a:focus {
        text-decoration: none;
    }

    .error-container a span:before {
        color: #E71E25;
        position: relative;
        top: 2px;
        left: -2px;
        transition: all .25s ease;
    }

    .error-container a:hover span:before,
    .error-container a:focus span:before {
        left: -7px;
        transition: all .25s ease;
    }
</style>

<script>
    export default {
        props: ['error'],
        layout: 'default'
    }
</script>