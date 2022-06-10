Vue.component('subscribe-comp', {
    template: `
        <section class="subscribe">
            <div class="subscribe-content content-container">
                <div class="subscribe-info">
                    <div class="subscribe-info-avatar"></div>
                    <p class="subscribe-info-text">&laquo;Vestibulum quis porttitor dui! Quisque viverra
                        nunc&nbsp;mi,
                        <span>a&nbsp;pulvinar purus condimentum&raquo;</span>
                    </p>
                </div>
                <div class="subscribe-form-wrp">
                    <p class="subscribe-form-title">Subscribe</p>
                    <p class="subscribe-form-subtitle">For our newletter and promotion</p>
                    <form action="#" class="subscribe-form">
                        <input class="subscribe-form-email" type="email" placeholder="Enter Your Email" required>
                        <button class="subscribe-form-btn" type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </section>        
    `
});