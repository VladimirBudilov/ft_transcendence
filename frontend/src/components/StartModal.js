export default class StartModal {
    constructor() {
        document.title = 'Instructions';
    }

    async getHtml() {
        return `
            <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title fw-bold" id="exampleModalLabel">Information</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row justify-content-center">
                                <img class="img_modal" src="/src/static/avatar.png" alt="">
                            </div>
                            <p>
                                In-game management instructions:
                            </p>
                            <p>
                                <span class="fw-bold" style="color: #FE638B;">Move left:</span> Press the <span class="fw-bold" style="color: #FE638B;">A</span> key<br>
                                <span class="fw-bold" style="color: #FE638B;">Move up:</span> Press the <span class="fw-bold" style="color: #FE638B;">W</span> key<br>
                                <span class="fw-bold" style="color: #FE638B;">Move down:</span> Press the <span class="fw-bold" style="color: #FE638B;">S</span> key<br>
                                <span class="fw-bold" style="color: #FE638B;">Move right:</span> Press the <span class="fw-bold" style="color: #FE638B;">D</span> key<br>
                            </p>
                            
                        <!--
                            <p>
                                You can also control the menu:
                            </p>
                            <p>
                                <span class="fw-bold" style="color: #FE638B;">Move up:</span> Use the Up key <span class="fw-bold" style="color: #FE638B;">(↑)</span><br>
                                <span class="fw-bold" style="color: #FE638B;">Move down:</span> Use the Down key <span class="fw-bold" style="color: #FE638B;">(↓)</span><br>
                                <span class="fw-bold" style="color: #FE638B;">Accept:</span> Enter <span class="fw-bold" style="color: #FE638B;">(⏎)</span><br>
                            </p>
                        -->
                        
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

}