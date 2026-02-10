// script.js
class ConsciousInterface {
    constructor() {
        this.currentSection = 0;
        this.sections = document.querySelectorAll('.chamber');
        this.markers = document.querySelectorAll('.marker');
        this.init();
    }

    init() {
        this.setupScrollNavigation();
        this.setupMarkerNavigation();
        this.setupCoreInteractions();
        this.setupModuleInteractions();
    }

    setupScrollNavigation() {
        let isScrolling = false;
        
        window.addEventListener('wheel', (e) => {
            if (isScrolling) return;
            
            isScrolling = true;
            const direction = e.deltaY > 0 ? 1 : -1;
            this.navigateToSection(this.currentSection + direction);
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }, { passive: true });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                this.navigateToSection(this.currentSection + 1);
            } else if (e.key === 'ArrowUp') {
                this.navigateToSection(this.currentSection - 1);
            }
        });
    }

    setupMarkerNavigation() {
        this.markers.forEach((marker, index) => {
            marker.addEventListener('click', () => {
                this.navigateToSection(index);
            });
        });
    }

    setupCoreInteractions() {
        const core = document.querySelector('.core-element');
        const lattice = document.querySelector('.neural-lattice');

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            if (lattice) {
                lattice.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
            }
        });
    }

    setupModuleInteractions() {
        const modules = document.querySelectorAll('.capability-module');
        const panel = document.querySelector('.module-panel');
        
        modules.forEach(module => {
            module.addEventListener('click', (e) => {
                e.stopPropagation();
                const moduleId = module.dataset.module;
                this.openModulePanel(moduleId);
            });
        });

        document.addEventListener('click', () => {
            this.closeModulePanel();
        });
    }

    navigateToSection(index) {
        if (index < 0 || index >= this.sections.length) return;
        
        this.currentSection = index;
        
        // Update active sections
        this.sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
        
        // Update markers
        this.markers.forEach((marker, i) => {
            marker.classList.toggle('active', i === index);
        });

        // Trigger section-specific animations
        this.animateSectionEntry(index);
    }

    animateSectionEntry(index) {
        const section = this.sections[index];
        
        switch(index) {
            case 2: // Capabilities
                this.animateMatrixGrid();
                break;
            case 3: // Process Flow
                this.animateFlowNodes();
                break;
            case 4: // Active Systems
                this.animateSystemLogs();
                break;
        }
    }

    animateMatrixGrid() {
        const modules = document.querySelectorAll('.capability-module');
        modules.forEach((module, i) => {
            module.style.animationDelay = `${i * 0.2}s`;
        });
    }

    animateFlowNodes() {
        const nodes = document.querySelectorAll('.flow-node');
        nodes.forEach((node, i) => {
            setTimeout(() => {
                nodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');
            }, i * 1000);
        });
        
        // Loop animation
        setInterval(() => {
            this.animateFlowNodes();
        }, 4000);
    }

    animateSystemLogs() {
        const logs = document.querySelectorAll('.log-entry');
        logs.forEach((log, i) => {
            setTimeout(() => {
                log.style.opacity = '1';
                log.style.transform = 'translateX(0)';
            }, i * 300);
        });
    }

    openModulePanel(moduleId) {
        const panel = document.querySelector('.module-panel');
        const content = panel.querySelector('.panel-content');
        
        // Add module-specific content
        content.innerHTML = this.getModuleContent(moduleId);
        panel.style.right = '0';
    }

    closeModulePanel() {
        const panel = document.querySelector('.module-panel');
        panel.style.right = '-400px';
    }

    getModuleContent(moduleId) {
        const content = {
            '1': `<h3>ANALYTICAL PROCESSING</h3><p>Advanced data interpretation and pattern analysis</p>`,
            '2': `<h3>PATTERN RECOGNITION</h3><p>Neural network-based pattern detection</p>`,
            '3': `<h3>DECISION MATRICES</h3><p>Multi-factor decision making systems</p>`,
            '4': `<h3>ADAPTIVE LEARNING</h3><p>Continuous improvement through experience</p>`
        };
        return content[moduleId] || '<p>Module data not available</p>';
    }
}

// Initialize the interface when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ConsciousInterface();
});

// Add smooth scrolling behavior
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
