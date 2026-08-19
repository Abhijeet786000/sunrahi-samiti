const SAMITI_PHONE = "919839272169";
const SAMITI_UPI = "9839272169@upi";
const SAMITI_NAME = "Sunrahi Devi Sangh";

// Tab Switching
function switchTab(tabId, el) {
  document.querySelectorAll(".tab-page").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  if (el) el.classList.add("active");
  window.scrollTo(0, 0);
}

function switchTabById(tabId) {
  const tabs = ["tab-home", "tab-booking", "tab-donation", "tab-schedule", "tab-about"];
  const index = tabs.indexOf(tabId);
  const navBtns = document.querySelectorAll(".nav-item");
  switchTab(tabId, navBtns[index]);
}

// UPI QR Code Generator
let qrcodeInstance = null;

function updatePaymentDetails() {
  const amount = document.getElementById("amount-input").value || "100";
  const upiLink = `upi://pay?pa=${SAMITI_UPI}&pn=${encodeURIComponent(SAMITI_NAME)}&am=${amount}&cu=INR`;

  const payBtn = document.getElementById("pay-upi-btn");
  if (payBtn) payBtn.href = upiLink;

  const qrContainer = document.getElementById("qrcode");
  if (qrContainer) {
    qrContainer.innerHTML = "";
    qrcodeInstance = new QRCode(qrContainer, {
      text: upiLink,
      width: 150,
      height: 150,
      colorDark: "#2c2c2c",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  }
}

// Aarti Booking via WhatsApp
function submitBooking(event) {
  event.preventDefault();
  const name = document.getElementById("book-name").value;
  const phone = document.getElementById("book-phone").value;
  const seva = document.getElementById("book-type").value;
  const date = document.getElementById("book-date").value;
  const gotra = document.getElementById("book-gotra").value || "उपलब्ध नहीं";

  const message = `*जय श्री गणेश - आरती/भोग सेवा बुकिंग*%0A` +
                  `------------------------------%0A` +
                  `*नाम:* ${encodeURIComponent(name)}%0A` +
                  `*फोन:* ${encodeURIComponent(phone)}%0A` +
                  `*सेवा:* ${encodeURIComponent(seva)}%0A` +
                  `*दिनांक:* ${encodeURIComponent(date)}%0A` +
                  `*गोत्र/संकल्प:* ${encodeURIComponent(gotra)}%0A` +
                  `------------------------------%0A` +
                  `_श्री सुनराही देवी नव युवक संघ, बर्तन बाजार_`;

  window.open(`https://wa.me/${SAMITI_PHONE}?text=${message}`, "_blank");
}

// Volunteer Registration via WhatsApp
function submitVolunteer(event) {
  event.preventDefault();
  const name = document.getElementById("vol-name").value;
  const phone = document.getElementById("vol-phone").value;
  const address = document.getElementById("vol-address").value;

  const message = `*जय श्री गणेश - सेवादार / कार्यकर्ता पंजीकरण*%0A` +
                  `------------------------------%0A` +
                  `*नाम:* ${encodeURIComponent(name)}%0A` +
                  `*फोन:* ${encodeURIComponent(phone)}%0A` +
                  `*पता/क्षेत्र:* ${encodeURIComponent(address)}%0A` +
                  `------------------------------%0A` +
                  `मैं गणेश जन्मोत्सव में स्वेच्छा से सेवा देना चाहता/चाहती हूँ।`;

  closeVolunteerModal();
  window.open(`https://wa.me/${SAMITI_PHONE}?text=${message}`, "_blank");
}

// Digital Receipt Generation
function generateReceipt() {
  const donorName = document.getElementById("donor-name").value.trim() || "सम्मानित भक्त";
  const amount = document.getElementById("amount-input").value || "501";
  const receiptNo = "SSD-" + Math.floor(1000 + Math.random() * 9000);
  const today = new Date().toLocaleDateString('hi-IN');

  document.getElementById("rec-id").innerText = receiptNo;
  document.getElementById("rec-date").innerText = today;
  document.getElementById("rec-name").innerText = donorName;
  document.getElementById("rec-amount").innerText = "₹" + amount;

  document.getElementById("receipt-modal").style.display = "grid";
}

// Modal Handlers
function openVolunteerModal() {
  document.getElementById("volunteer-modal").style.display = "grid";
}
function closeVolunteerModal() {
  document.getElementById("volunteer-modal").style.display = "none";
}
function closeReceiptModal() {
  document.getElementById("receipt-modal").style.display = "none";
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  updatePaymentDetails();
  const amtInput = document.getElementById("amount-input");
  if (amtInput) amtInput.addEventListener("input", updatePaymentDetails);
});