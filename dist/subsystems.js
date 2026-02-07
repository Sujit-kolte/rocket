document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.subsystems-bento');
    const cards = document.querySelectorAll('.bento-card');
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    // const closeBtn = document.getElementById('detail-close'); // Removed

    // Data for subsystems with extended descriptions
    const subsystemsData = {
        'AEROSTRUCTURE': {
            title: 'AEROSTRUCTURE',
            desc: `The spine of flight. Precision-engineered airframes designed for aerodynamic stability and structural integrity under high-g loads.<br><br>
            Our airframes are constructed using aerospace-grade composite materials, including carbon fiber and fiberglass, to ensure a high strength-to-weight ratio. We utilize advanced CAD simulations and CFD analysis to optimize drag coefficients and stability margins.<br><br>
            Every component, from the nose cone to the fins, is meticulously crafted to withstand the immense dynamic pressures of supersonic flight.`
        },
        'PROPULSION': {
            title: 'PROPULSION',
            desc: `Ignition & Thrust. Custom solid motors delivering raw power to pierce the sky.<br><br>
            We design, simulate, and manufacture our own solid rocket motors. Our propulsion team specializes in grain geometry optimization to achieve precise thrust curves tailored to specific mission profiles.<br><br>
            Safety and performance are paramount. We conduct rigorous static fire tests to validate burn rates, casing integrity, and nozzle efficiency before any launch.`
        },
        'AVIONICS': {
            title: 'AVIONICS',
            desc: `The Nervous System. Advanced flight computers and telemetry for real-time data.<br><br>
            Our avionics suite features custom-designed PCBs, redundant flight computers, and long-range telemetry systems. We monitor altitude, acceleration, GPS coordinates, and orientation in real-time.<br><br>
            The system acts as the brain of the rocket, autonomously making critical decisions for parachute deployment and payload activation.`
        },
        'GROUND STATION': {
            title: 'GROUND STATION',
            desc: `The Eye of the Storm. Advanced flight computers and telemetry for real-time data.<br><br>
            Our avionics suite features custom-designed PCBs, redundant flight computers, and long-range telemetry systems. We monitor altitude, acceleration, GPS coordinates, and orientation in real-time.<br><br>
            The system acts as the brain of the rocket, autonomously making critical decisions for parachute deployment and payload activation.`
        },
        'RECOVERY': {
            title: 'RECOVERY',
            desc: `Safe Returns. Dual-deployment parachute systems ensuring a gentle touchdown.<br><br>
            We employ a dual-deployment strategy using drogue and main parachutes to ensure a controlled descent. This prevents drift and protects the rocket from landing damage.<br><br>
            Our ejection systems utilize black powder charges triggered by the avionics bay at precise altitudes, guaranteeing 99.9% reliability.`
        },
        'PAYLOAD': {
            title: 'PAYLOAD',
            desc: `Mission Objective. Scientific experiments carried to the edge of the atmosphere.<br><br>
            From deploying can-sats to biological experiments, our payload module is versatile and modular. We enable scientific research in microgravity environments.<br><br>
            The payload bay is designed to protect sensitive instruments from vibration and thermal extremes during the ascent.`
        }
    };

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent bubbling if clicking inside already active? No, update content.
            e.stopPropagation();

            const title = card.querySelector('.card-title').textContent.trim().toUpperCase();
            const data = subsystemsData[title];

            if (data) {
                // Activate Layout
                container.classList.add('active');

                // Highlight active card
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');

                // Update Content with Fade Effect
                detailTitle.style.opacity = '0';
                detailDesc.style.opacity = '0';

                setTimeout(() => {
                    detailTitle.textContent = data.title;
                    detailDesc.innerHTML = data.desc;

                    detailTitle.style.opacity = '1';
                    detailDesc.style.opacity = '1';
                }, 300);
            }
        });
    });

    // Close Interaction - Disabled as per request (Persistent Mode)
    // The panel stays open once activated.
});
