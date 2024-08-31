export default function() {
	const selectuser = document.getElementById('selectblood');
	selectblood.textContent = blood.options[blood.selectedIndex].value + ":" + blood.options[blood.selectedIndex].textContent;
}