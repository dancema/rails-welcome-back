module Error
  class AlreadyScannedError < CustomError
    def initialize
      super(:already_scanned, 409, 'Already scanned')
    end
  end
end
