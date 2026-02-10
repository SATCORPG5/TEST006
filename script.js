// script.js
class ConsciousInterface {
    constructor() {
        this.currentSection = 0;
        this.sections = document.querySelectorAll('.chamber');
        this.markers = document.querySelectorAll('.marker');
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupScrollNavigation();
        this.setupMarkerNavigation();
        this.setupCoreInteractions();
        this.setupModuleInteractions();
        this.setupTerminal();
        this.animateEntryChamber();
    }

    setupScrollNavigation() {
        let isScrolling = false;
        
        document.getElementById('core-container').addEventListener('wheel', (e) => {
            if (isScrolling || this.isAnimating) return;
            
            isScrolling = true;
            const direction = e.deltaY > 0 ? 1 : -1;
            this.navigateToSection(this.currentSection + direction);
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;
            
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
                if (!this.isAnimating) {
                    this.navigateToSection(index);
                }
            });
        });
    }

    setupCoreInteractions() {
        const core = document.querySelector('.core-element');
        if (!core) return;
        
        core.addEventListener('mousemove', (e) => {
            const rect = core.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const rotateX = (e.clientY - centerY) / 20;
            const rotateY = (centerX - e.clientX) / 20;
            
            core.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        core.addEventListener('mouseleave', () => {
            core.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
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
            
            module.addEventListener('mouseenter', () => {
                module.querySelector('.module-outline').style.borderColor = 'rgba(0, 255, 255, 0.5)';
                module.querySelector('.module-outline').style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
            });
            
            module.addEventListener('mouseleave', () => {
                module.querySelector('.module-outline').style.borderColor = 'rgba(0, 255, 255, 0.1)';
                module.querySelector('.module-outline').style.boxShadow = 'none';
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.capability-module') && !e.target.closest('.module-panel')) {
                this.closeModulePanel();
            }
        });
    }

    setupTerminal() {
        const button = document.querySelector('.transmit-button');
        if (button) {
            button.addEventListener('click', () => {
                button.textContent = 'TRANSMISSION SENT';
                button.style.background = 'rgba(0, 255, 255, 0.2)';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = 'SEND TRANSMISSION';
                    button.style.background = 'rgba(0, 255, 255, 0.1)';
                    button.disabled = false;
                }, 3000);
            });
        }
    }

    navigateToSection(index) {
        if (index < 0 || index >= this.sections.length || this.isAnimating) return;
        
        this.isAnimating = true;
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
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }

    animateSectionEntry(index) {
        switch(index) {
            case 1: // Identity
                this.animateDataPairs();
                break;
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

    animateEntryChamber() {
        const entry = document.getElementById('entry');
        if (entry.classList.contains('active')) {
            setTimeout(() => {
                entry.querySelector('.neural-lattice').style.animation = 'pulse 8s infinite ease-in-out';
            }, 500);
        }
    }

    animateDataPairs() {
        const pairs = document.querySelectorAll('#identity .data-pair');
        pairs.forEach((pair, i) => {
            pair.style.opacity = '0';
            pair.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                pair.style.transition = 'all 0.6s ease';
                pair.style.opacity = '1';
                pair.style.transform = 'translateY(0)';
            }, i * 200);
        });
    }

    animateMatrixGrid() {
        const modules = document.querySelectorAll('#capabilities .capability-module');
        modules.forEach((module, i) => {
            module.style.opacity = '0';
            module.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                module.style.transition = 'all 0.5s ease';
                module.style.opacity = '1';
                module.style.transform = 'scale(1)';
            }, i * 150);
        });
    }

    animateFlowNodes() {
        const nodes = document.querySelectorAll('#process .flow-node');
        nodes.forEach((node, i) => {
            node.style.opacity = '0';
            
            setTimeout(() => {
                node.style.transition = 'all 0.5s ease';
                node.style.opacity = '1';
            }, i * 300);
        });
        
        // Animate sequence
        let step = 0;
        const interval = setInterval(() => {
            nodes.forEach(node => node.classList.remove('active'));
            if (nodes[step]) {
                nodes[step].classList.add('active');
                step = (step + 1) % nodes.length;
            }
        }, 1500);
        
        // Store interval ID to clear later if needed
        this.flowInterval = interval;
    }

    animateSystemLogs() {
        const logs = document.querySelectorAll('#systems .log-entry');
        logs.forEach((log, i) => {
            setTimeout(() => {
                log.classList.add('visible');
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
        if (panel) {
            panel.style.right = '-400px';
        }
    }

    getModuleContent(moduleId) {
        const content = {
            '1': `<h3>ANALYTICAL PROCESSING</h3><p>Advanced data interpretation and pattern analysis systems. Real-time processing capabilities with quantum-enhanced algorithms.</p>`,
            '2': `<h3>PATTERN RECOGNITION</h3><p>Neural network-based pattern detection across multi-dimensional datasets. Adaptive recognition protocols for evolving data structures.</p>`,
            '3': `<h3>DECISION MATRICES</h3><p>Multi-factor decision making systems with probabilistic outcome modeling. Real-time scenario simulation and optimization protocols.</p>`,
            '4': `<h3>ADAPTIVE LEARNING</h3><p>Continuous improvement through experience-based optimization. Self-modifying algorithmic structures for enhanced performance.</p>`
        };
        return content[moduleId] || '<p>Module data not available</p>';
    }
}

// Initialize the interface when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.interface = new ConsciousInterface();
});
