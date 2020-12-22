/**
 * Attach event listener to button
 */
const attachEventListener = () => {
    const btn = document.getElementById('makeRequest');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value;
      getWorkingWeek(name);
    })
  }
  
  /**
   * Takes a name and calls the API to get the count of that name in Oliver Twist
   * @param {string} date a name to count occurrences of
   */
  const getWorkingWeek = async (name) => {
    const response = await fetch(`/name/${name}`);
    const data = await response.json();
    const result = document.getElementById('result');
    if (result) {
      result.parentNode.removeChild(result);
    }
    const el = document.createElement('div');
    el.innerHTML = `<div id="result" class="alert alert-info fade show" role="alert">
      <strong>Result:</strong>
      <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
    </div>`;
    document.getElementsByClassName('container')[0].appendChild(el);
  };
  
  attachEventListener();
