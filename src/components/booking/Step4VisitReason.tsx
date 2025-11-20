// Step 4 visit reason removed
export default function Step4VisitReasonDeleted() {
  return null;
}
        <div className="space-y-8">
          {/* Visit Reason Section */}

      {/* Visit Reason Section */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h3 className="font-semibold mb-4" style={{ fontSize: '38px', color: '#28436F' }}>Visit Information</h3>

        <div className="space-y-6">
          {/* Reason for Visit */}
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px' }}>Reason for Visit *</label>
            <select
              value={visitInfo.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select a reason</option>
              {visitReasons.map((reason) => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px' }}>Describe Your Symptoms *</label>
            <textarea
              value={visitInfo.symptoms}
              onChange={(e) => handleChange("symptoms", e.target.value)}
              placeholder="Please describe your symptoms in detail..."
              className="w-full p-3 border rounded-lg min-h-[100px]"
            />
          </div>

          {/* Pregnancy Question */}
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px' }}>Are you currently pregnant? *</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pregnancy"
                  checked={visitInfo.isPregnant === true}
                  onChange={() => handleChange("isPregnant", true)}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pregnancy"
                  checked={visitInfo.isPregnant === false}
                  onChange={() => handleChange("isPregnant", false)}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Allergies */}
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px' }}>Allergies *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonAllergies.map((allergy) => (
                <label key={allergy} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visitInfo.allergies.includes(allergy)}
                    onChange={() => toggleAllergy(allergy)}
                    className="rounded"
                  />
                  <span style={{ fontSize: '14px' }}>{allergy}</span>
                </label>
              ))}
            </div>
            {visitInfo.allergies.includes("Other") && (
              <Input
                value={visitInfo.otherAllergy}
                onChange={(e) => handleChange("otherAllergy", e.target.value)}
                placeholder="Please specify other allergies"
                className="mt-3"
              />
            )}
          </div>

          {/* Doctor's Note */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={visitInfo.needDoctorNote}
                onChange={(e) => handleChange("needDoctorNote", e.target.checked)}
                className="rounded"
              />
              <div>
                <p className="font-medium">Need a Doctor's Note?</p>
                <p className="text-gray-600" style={{ fontSize: '14px' }}>We can provide documentation for work or school</p>
              </div>
            </label>
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px' }}>Upload ID / Picture</label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <input
                type="file"
                id="fileUpload"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf"
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <Upload className="mx-auto mb-3 text-gray-400" size={40} />
                <p className="text-gray-600 mb-2" style={{ fontSize: '14px' }}>Click to upload or drag and drop</p>
                <p className="text-gray-500" style={{ fontSize: '12px' }}>PNG, JPG, PDF up to 10MB</p>
              </label>
              {visitInfo.uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {visitInfo.uploadedFiles.map((file: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700" style={{ fontSize: '14px' }}>
                      <FileText size={16} />
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pharmacy Information */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="text-[#2B4C9A]" size={24} />
          <h3 className="font-semibold" style={{ fontSize: '38px', color: '#28436F' }}>Pharmacy Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pharmacy Name */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2" style={{ fontSize: '14px' }}>Pharmacy Name *</label>
            <Input
              value={visitInfo.pharmacyName}
              onChange={(e) => handleChange("pharmacyName", e.target.value)}
              placeholder="Enter pharmacy name"
              className="w-full"
            />
          </div>

          {/* Pharmacy Phone */}
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px' }}>Pharmacy Phone *</label>
            <Input
              type="tel"
              value={visitInfo.pharmacyPhone}
              onChange={(e) => handleChange("pharmacyPhone", e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full"
            />
          </div>

          {/* Pharmacy ZIP */}
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px' }}>ZIP Code *</label>
            <Input
              value={visitInfo.pharmacyZip}
              onChange={(e) => handleChange("pharmacyZip", e.target.value)}
              placeholder="ZIP Code"
              maxLength={5}
              className="w-full"
            />
          </div>

          {/* Pharmacy Address */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2" style={{ fontSize: '14px' }}>Pharmacy Address *</label>
            <Input
              value={visitInfo.pharmacyAddress}
              onChange={(e) => handleChange("pharmacyAddress", e.target.value)}
              placeholder="Enter full pharmacy address"
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-600" style={{ fontSize: '14px' }}>
            <strong>OR</strong> Select pharmacy by ZIP code (coming soon)
          </p>
        </div>
      </div>

      {/* Agreements */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h3 className="font-semibold mb-4" style={{ fontSize: '38px', color: '#28436F' }}>Final Confirmations</h3>
        
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={visitInfo.agreeFollowUp}
              onChange={(e) => handleChange("agreeFollowUp", e.target.checked)}
              className="mt-1"
            />
            <div>
              <p className="font-medium">Follow-up Care Agreement</p>
              <p className="text-gray-600" style={{ fontSize: '14px' }}>
                I agree to follow up with my regular doctor for ongoing care and understand this is for acute care needs.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={visitInfo.certifyAccuracy}
              onChange={(e) => handleChange("certifyAccuracy", e.target.checked)}
              className="mt-1"
            />
            <div>
              <p className="font-medium">Information Accuracy Certification</p>
              <p className="text-gray-600" style={{ fontSize: '14px' }}>
                I certify that all information provided is accurate and complete to the best of my knowledge.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="px-8">
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="bg-[#2B4C9A] hover:bg-[#1c1c1c] px-8"
        >
          Submit Appointment
        </Button>
      </div>
        </div>
      </div>
    </div>
  );
// NOTE: delete this file once all references are removed.
