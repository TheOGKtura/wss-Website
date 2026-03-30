(() => {
      const modal = document.getElementById('record-flow-modal');
      const closeBtn = document.getElementById('close-record-flow-modal');
      const content = document.getElementById('record-flow-content');

      const previewById = {
        1: {
          record_id: 101,
          shift: 'Shift A',
          operation: {
            id: 1,
            product_name: 'CDO CRISPY BURGER 228g',
            average_weight: 228,
            weight_reading: 227.65,
            defect_weight: false,
            defect_packaging: false,
            operator_name: 'L. Cruz',
            timestamp: 1773955500000
          }
        },
      };



      function openModal(operationId) {
        const payload = previewById[operationId] || { error: 'No preview data available for this item.' };
        content.textContent = JSON.stringify(payload, null, 2);
        modal.style.display = 'flex';
      }

      function closeModal() {
        modal.style.display = 'none';
      }

      document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }

        if (target.classList.contains('open-record-flow')) {
          const operationId = Number(target.getAttribute('data-operation-id') || 0);
          openModal(operationId);
        }
      });

      closeBtn?.addEventListener('click', closeModal);
      modal?.addEventListener('click', (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
    })();