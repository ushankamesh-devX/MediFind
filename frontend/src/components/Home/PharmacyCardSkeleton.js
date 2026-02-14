import React from 'react';

function PharmacyCardSkeleton() {
    return (
        <div className="bg-white border border-gray-200 p-6 shadow-sm animate-pulse">
            {/* Header */}
            <div className="flex gap-4 mb-4">
                <div className="w-14 h-14 bg-gray-200 rounded flex-shrink-0"></div>

                <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>

                <div className="flex flex-col items-end">
                    <div className="h-8 w-12 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-8 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Body */}
            <div className="py-3 border-t border-gray-200 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Footer */}
            <div className="pt-4 flex gap-2">
                <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1 h-12 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
}

export default PharmacyCardSkeleton;
